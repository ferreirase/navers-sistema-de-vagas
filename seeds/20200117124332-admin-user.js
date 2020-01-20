const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@gmail.com",
          phone: "62983554477", 
          cpf: "55588877741",
          admin: true,
          password_hash: bcrypt.hashSync("admin123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};