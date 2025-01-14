import { NextFunction, Request, Response } from "express";
import { Author } from "../../types/LocalTypes";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from "../models/authorModel";

const authorsGet = (_req: Request, res: Response<Author[]>) => {
  const authors = getAllAuthors();
  res.json(authors);
};

const authorGet = (req: Request<{ id: string }>, res: Response<Author | { error: string }>) => {
  try {
    const author = getAuthor(Number(req.params.id));
    res.json(author);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

const authorPost = (
  req: Request<unknown, unknown, Omit<Author, "id">>,
  res: Response<Author>,
  next: NextFunction
) => {
  try {
    const author = createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(new Error((error as Error).message));
  }
};

const authorPut = (
  req: Request<{ id: string }, unknown, Author>,
  res: Response<Author>,
  next: NextFunction
) => {
  try {
    const author = updateAuthor(
      Number(req.params.id),
      req.body.name,
      req.body.email
    );
    res.json(author);
  } catch (error) {
    next(new Error((error as Error).message));
  }
};

const authorDelete = (
  req: Request<{ id: string }>,
  res: Response<unknown>,
  next: NextFunction
) => {
  try {
    deleteAuthor(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(new Error((error as Error).message));
  }
};

export { authorsGet, authorGet, authorPost, authorPut, authorDelete };