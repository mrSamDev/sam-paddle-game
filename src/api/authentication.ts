import { AuthResponse } from "../types/authentication";
import client from "./base";

interface CallbackResponse extends AuthResponse {
  error?: string;
}

export const validateGithubToken = async (code: string): Promise<CallbackResponse> => {
  try {
    const data = await client
      .post(`auth/github/callback`, {
        json: { code },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json<CallbackResponse>();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to exchange code for token");
  }
};
