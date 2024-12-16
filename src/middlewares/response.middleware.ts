import { Request, Response, NextFunction } from "express";

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Sobrescribimos el método `res.json`
  const originalJson = res.json;

  res.json = function (body: any) {
    const standardizedResponse = {
      status: body instanceof Error ? false : true,
      message: body?.message || (body instanceof Error ? body.message : "Success"),
      data: body?.data || (body instanceof Error ? null : body),
    };

    // Llamamos al método original
    return originalJson.call(this, standardizedResponse);
  };

  next();
};
