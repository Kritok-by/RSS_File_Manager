import { lstat } from "fs/promises";
import { chdir, cwd } from "process";
import { isAbsolute, join, parse } from "path";

export const up = () => {
  if (parse(cwd()).root === cwd()) {
    throw new Error("You are in root derectory!");
  }

  chdir("../");
};

export const cd = async (path) => {
  if (!path) {
    throw new Error("Invalid input: please write path uri!");
  }
  const prevPath = cwd();

  try {
    chdir(path);
    await lstat(cwd());
  } catch (e) {
    chdir(prevPath);
    throw new Error(`cd: no such directory: ${path}`);
  }
};

export const getPath = (path) => {
  return isAbsolute(path) ? path : join(cwd(), path);
};
