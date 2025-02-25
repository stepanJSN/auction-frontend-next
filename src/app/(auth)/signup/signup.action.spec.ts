import { userService } from "@/services/userService";
import { signupAction } from "./signup.action";
import { MutationStatusEnum } from "@/enums/mutationStatus";

jest.mock("@/services/userService", () => ({
  userService: {
    create: jest.fn(),
  },
}));

describe("signupAction", () => {
  const mockUserData = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    surname: "Test surname",
  };

  it("calls userService.create with correct data", async () => {
    (userService.create as jest.Mock).mockResolvedValue({
      status: MutationStatusEnum.SUCCESS,
    });

    const result = await signupAction(mockUserData);

    expect(userService.create).toHaveBeenCalledWith(mockUserData);
    expect(result).toEqual({ status: MutationStatusEnum.SUCCESS });
  });
});
