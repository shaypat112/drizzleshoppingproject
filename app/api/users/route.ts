import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { usersTable } from '@/src/db/schema';

export async function GET() {
  try {
    const users = await db.select().from(usersTable);
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, email } = body;

    if (!name || !age || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        age: parseInt(age),
        email,
      })
      .returning();

    return NextResponse.json({ success: true, data: newUser[0] });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
