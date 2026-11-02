import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../data/site";
import { getVisibleProjects } from "../lib/projects";

const routes = [
  "/",
  "/projects/",
  ...getVisibleProjects().map((project) => `/projects/${project.slug}/`),
];

for (const route of routes) {
  test(`page, navigation, accessibility and assets: ${route}`, async ({
    page,
  }) => {
    const failures: string[] = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("response", (response) => {
      if (
        response.status() >= 400 &&
        response.url().startsWith("http://127.0.0.1:4173")
      )
        failures.push(`${response.status()} ${response.url()}`);
    });
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.reload();
    await expect(page.getByRole("main")).toBeVisible();
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
        ),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    expect(failures).toEqual([]);
  });
}

test("draft and unknown routes return HTTP 404", async ({ request }) => {
  for (const path of [
    "/projects/adulive-university-systems/",
    "/projects/not-a-project/",
    "/missing-page/",
  ])
    expect((await request.get(path)).status()).toBe(404);
});

test("all local links and image variants resolve", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")!),
      ))
      links.add(href.split("#")[0] || "/");
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  for (const project of getVisibleProjects())
    for (const image of project.images.filter((image) => image.approved))
      for (const width of image.variants)
        expect(
          (
            await request.get(image.src.replace(/\.webp$/, `-${width}.webp`))
          ).status(),
        ).toBe(200);
});

for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
  test(`responsive reflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      if ((width === 390 || width === 1440) && route === "/") {
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: testInfo.outputPath(`homepage-${width}.png`),
          fullPage: true,
        });
      }
    }
  });
}

test("mobile disclosure supports keyboard, escape, and destination focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator("summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator("details")).not.toHaveAttribute("open");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator("#work")).toBeFocused();
  await expect(page.locator("details")).not.toHaveAttribute("open");
});

test("skip link and anchor offsets work with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.goto("/#work");
  const position = await page.locator("#work").boundingBox();
  expect(position!.y).toBeGreaterThanOrEqual(76);
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
});

test("navigation and content work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.locator("summary").click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Interactive digital invitations", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(
    "Interactive digital invitations",
  );
  await context.close();
});

test("contact and CV links are honest and work when configured", async ({
  page,
  request,
}) => {
  await page.goto("/");
  if (site.email)
    await expect(page.locator(`a[href="mailto:${site.email}"]`)).toBeVisible();
  else {
    await expect(page.getByText("Contact details coming soon")).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  }
  if (site.resume) {
    const response = await request.get(site.resume);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await expect(
      page.locator(`a[href="${site.resume}"]`).first(),
    ).toHaveAttribute("download");
  } else await expect(page.locator("a[download]")).toHaveCount(0);
});
