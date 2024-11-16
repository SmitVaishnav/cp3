"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    // First try to find by clerkId
    let existingUser = await User.findOne({ clerkId: user.clerkId });
    
    if (existingUser) {
      console.log("User found by clerkId:", existingUser);
      return JSON.parse(JSON.stringify(existingUser));
    }

    // If not found by clerkId, try to find by email
    existingUser = await User.findOne({ email: user.email });
    
    if (existingUser) {
      // Update the existing user with the new clerkId
      console.log("User found by email, updating clerkId");
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        { clerkId: user.clerkId },
        { new: true }
      );
      return JSON.parse(JSON.stringify(updatedUser));
    }

    // If no existing user found, create new user
    const newUser = await User.create(user);
    console.log("New user created:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error in createUser:", error);
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    console.log("Searching for user with clerkId:", userId);

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("User not found in the database for clerkId:", userId);
      
      try {
        // Fetch user details from Clerk
        const clerkUser = await clerkClient.users.getUser(userId);
        
        if (!clerkUser) {
          console.log("User not found in Clerk");
          return null;
        }

        // Create a new user with Clerk data
        const newUser = await createUser({
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          username: clerkUser.username || `user${userId.slice(-5)}`,
          firstName: clerkUser.firstName || "",
          lastName: clerkUser.lastName || "",
          photo: clerkUser.imageUrl || "https://example.com/placeholder.jpg"
        });

        if (!newUser) {
          console.log("Failed to create new user");
          return null;
        }

        console.log("Created new user:", newUser);
        user = newUser;
      } catch (clerkError) {
        console.error("Error fetching user from Clerk:", clerkError);
        return null;
      }
    }

    if (!user) {
      console.log("User not found and could not be created");
      return null;
    }

    console.log("User found or created:", user);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in getUserById:", error);
    return null;
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditsToAdd: number) {
  try {
    await connectToDatabase();

    console.log(`Attempting to update credits for user with clerkId: ${userId}`);

    // First, try to find the user
    let user = await User.findOne({ clerkId: userId });

    // If user is not found, attempt to create one
    if (!user) {
      console.log(`User not found for clerkId: ${userId}. Attempting to create.`);
      user = await getUserById(userId);
      if (!user) {
        console.error(`Failed to find or create user with clerkId: ${userId}`);
        // Instead of throwing an error, we'll return null
        return null;
      }
      console.log(`User created: ${JSON.stringify(user)}`);
    }

    // Now that we're sure the user exists, update the credits
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { creditBalance: creditsToAdd } },
      { new: true }
    );

    if (!updatedUser) {
      console.error(`Failed to update credits for user with clerkId: ${userId}`);
      // Instead of throwing an error, we'll return null
      return null;
    }

    console.log(`Credits updated successfully for user: ${JSON.stringify(updatedUser)}`);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating user credits:", error);
    // Instead of throwing the error, we'll return null
    return null;
  }
}