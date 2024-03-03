import { Color } from "../models/Color";

const URL = "http://localhost:3001/colors";

const headers = {
  "Content-Type": "application/json",
};

const create = async (
  createDto: Omit<Partial<Color>, "id"> & { type: "multiplier" | "tolerance" }
): Promise<Color> => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(createDto),
    headers,
  }).then((response) => response.json());

  return response;
};

const findByType = async (
  type: "tolerance" | "multiplier"
): Promise<Color[]> => {
  const response = await fetch(URL + "/" + type).then((response) =>
    response.json()
  );

  return response;
};

const update = async (
  id: number,
  updateDto: Partial<Color>
): Promise<Color> => {
  const response = await fetch(URL + "/" + id, {
    method: "PATCH",
    body: JSON.stringify(updateDto),
    headers,
  }).then((response) => response.json());

  return response;
};

const remove = async (id: number): Promise<{ affected?: number }> => {
  const response = await fetch(URL + "/" + id, { method: "DELETE" }).then((response) =>
    response.json()
  );

  return response;
};

export { create, findByType, update, remove };
