const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    return next();
  } catch (err) {
    const errors = {};
    err.inner.forEach((e) => {
      if (e.path) {
        errors[e.path] = e.message;
      }
    });
    return res.status(400).json({
      type: "Validation Error",
      errors: errors,
    });
  }
};

export default validate;
