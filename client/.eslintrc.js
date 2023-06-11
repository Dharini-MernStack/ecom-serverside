module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        // ...
        "react-hooks"
      ],
      "rules": {
        // ...
        "eqeqeq": "off",
          "no-console": "off",
          "no-unused-vars": "off"
        
      }
      
      
  }