import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(request) {
  const { name, email, password, role } = await request.json();

  if (!name || !email || !password || !role) {
    return Response.json(
      { error: "Name, email, password, and role are all required." },
      { status: 400 },
    );
  }

  if (!["buyer", "seller"].includes(role)) {
    return Response.json({ error: "Invalid role." }, { status: 400 });
  }

  if (password.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  await dbConnect();

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail });

  if (existing) {
    return Response.json(
      { error: "An account with that email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role,
  });

  return Response.json({ ok: true }, { status: 201 });
}
