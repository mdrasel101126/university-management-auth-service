import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefresTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...other } = result;

  //set refress token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('PhuRefreshToken', refreshToken, cookieOptions);

  /* delete result.refreshToken; */ //not recomended

  if ('refreshToken' in result) {
    delete result.refreshToken;
  }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: other,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { PhuRefreshToken } = req.cookies;
  const result = await AuthService.refreshToken(PhuRefreshToken);

  //set refress token into cookie
  /*   const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('PhuRefreshToken', refreshToken, cookieOptions); */

  sendResponse<IRefresTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
