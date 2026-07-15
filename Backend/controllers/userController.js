import users from "../data/users.js";

// GET all users
export const getUsers = (
  req,
  res
) => {
  res.json(users);
};

// GET user by ID
export const getUserById = (
  req,
  res
) => {
  const id = Number(
    req.params.id
  );

  const user =
    users.find(
      (u) => u.id === id
    );

  if (!user) {
    return res.status(404).json({
      message:
        "User not found"
    });
  }

  res.json(user);
};

// POST create user
export const createUser = (
  req,
  res
) => {

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);

  res.status(201).json({
    message:
      "User Created Successfully",
    newUser
  });
};

export const updateUser = (
  req,
  res
) => {

  const id = Number(
    req.params.id
  );

  const user =
    users.find(
      (u) => u.id === id
    );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name =
    req.body.name ||
    user.name;

  user.email =
    req.body.email ||
    user.email;

  res.json({
    message:
      "User Updated Successfully",
    user
  });
};
export const deleteUser = (
  req,
  res
) => {

  const id = Number(
    req.params.id
  );

  const index =
    users.findIndex(
      (u) => u.id === id
    );

  if (index === -1) {
    return res.status(404).json({
      message:
        "User not found"
    });
  }

  users.splice(index, 1);

  res.json({
    message:
      "User Deleted Successfully"
  });
};