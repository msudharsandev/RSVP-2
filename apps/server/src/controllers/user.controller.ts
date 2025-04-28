import { IAuthenticatedRequest } from '@/interface/middleware';
import { UserRepository } from '@/repositories/user.repository';
import { BadRequestError, NotFoundError, TokenExpiredError } from '@/utils/apiError';
import { SuccessResponse } from '@/utils/apiResponse';
import catchAsync from '@/utils/catchAsync';
import logger from '@/utils/logger';
import { profilePayloadSchema, usernameSchema } from '@/validations/users.validation';
import { Request } from 'express';
import z from 'zod';

/**
 * Updates the profile of the authenticated user.
 * @param req - The HTTP request object containing the user's profile data in the body.
 * @param res - The HTTP response object.
 * @returns The updated user profile.
 */
export const updateUserProfileController = catchAsync(
  async (req: IAuthenticatedRequest<{}, {}, z.infer<typeof profilePayloadSchema>>, res) => {
    const userId = req.userId as unknown as string;
    if (!userId) throw new TokenExpiredError();

    let user = await UserRepository.updateProfile(userId, req.body);
    if (!user) throw new TokenExpiredError();
    const { fullName, location, contact } = user;

    logger.info('Checking if user profile is completed in updateUserProfileController ...');
    if (!!fullName && !!location && !!contact) {
      user = await UserRepository.updateProfile(userId, { isCompleted: true });
    }
    return new SuccessResponse('success', user).send(res);
  }
);

/**
 * Retrieves a user by their username.
 * @param req - The HTTP request object containing the username in the parameters.
 * @param res - The HTTP response object.
 * @returns The user's public profile data.
 */
export const getUserPublicController = catchAsync(
  async (req: Request<{}, {}, z.infer<typeof usernameSchema>>, res) => {
    const { userName } = req.params as z.infer<typeof usernameSchema>;

    logger.info('Getting user by username in getUserPublicController ...');
    const user = await UserRepository.findByUserName(userName);
    if (!user) throw new NotFoundError('User not found');

    const { refreshToken, magicToken, ...publicUserProfile } = user;
    return new SuccessResponse('success', publicUserProfile).send(res);
  }
);

/**
 * Soft deletes a user by setting its `isDeleted` status to true.
 * @param req - The HTTP request object containing the user ID in the parameters.
 * @param res - The HTTP response object.
 * @returns A success message if the user is deleted successfully.
 */
export const deleteUserController = catchAsync(
  async (req: IAuthenticatedRequest<{ userId?: string }, {}, {}>, res) => {
    const { userId } = req.params;
    if (!userId) throw new BadRequestError('User ID is required');

    const deletedUser = await UserRepository.delete(userId);
    if (!deletedUser) throw new NotFoundError('User not found');

    return new SuccessResponse('success', deletedUser).send(res);
  }
);
