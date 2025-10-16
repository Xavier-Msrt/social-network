package be.xaviermassart.socialnetwork.validator;

public class PasswordValidator {

    public static boolean validate(String password) {
        if (password == null || password.length() < 14) {
            return false;
        }

        boolean hasUppercase = false;
        boolean hasLowercase = false;
        boolean hasDigit = false;
        boolean hasSpecialChar = false;

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) { // at least one uppercase character is required
                hasUppercase = true;
            } else if (Character.isLowerCase(c)) { // at least one lowercase character is required
                hasLowercase = true;
            } else if (Character.isDigit(c)) { // at least one digit is required
                hasDigit = true;
            } else if (!Character.isLetterOrDigit(c)) {
                hasSpecialChar = true;  // Any non-alphanumeric character is considered a special character
            }
        }

        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
    }
}
