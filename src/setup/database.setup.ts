import { AppDataSource } from "./datasource";
import { UserEntity } from "@/entities";
import bcrypt from "bcryptjs";
import { authService } from "@/services";
import { CreateUserRequestType } from "@/types";
import "dotenv/config";

export const databaseSetup = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize(); // Initialize TypeORM
    }

    const userRepository = AppDataSource.getRepository(UserEntity);
    const userCount: number = await userRepository.count();

    if (userCount === 0) {
      const adminHashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

      const adminUser: CreateUserRequestType = {
        name: process.env.ADMIN_NAME,
        hashedPassword: adminHashedPassword,
        role: "admin",
      };

      await authService.createUser(adminUser);
    }

    console.log("✅ Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
  }
};
