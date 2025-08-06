import { type APIRoute } from "astro";

export const post: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get("password");

  // Set your password here
  if (password === "astro123") {
    cookies.set("admin_auth", "true", {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: true
    });
    return redirect("/admin");
  }
  
  return redirect("/admin/login?error=1");
};