const { ROLE_HIERARCHY } = require('../constants/role-hierarchy')

/**
 * Middleware для проверки роли пользователя.
 *
 * @param {('USER' | 'MODERATOR' | 'ADMIN' | 'SUPERADMIN')} requiredRole - Требуемая роль для доступа к ресурсу. Должна быть одним из значений: 'USER', 'MODERATOR', 'ADMIN', 'SUPERADMIN'.
 * @returns {Function} Express middleware функция, которая проверяет уровень доступа пользователя.
 */
exports.verifyRole = (requiredRole) => (req, res, next) => {
    const userRoleIndex = ROLE_HIERARCHY.indexOf(req.user.role) // Индекс роли пользователя в иерархии
    const requiredRoleIndex = ROLE_HIERARCHY.indexOf(requiredRole) // Требуемый индекс роли для доступа

    if (userRoleIndex >= requiredRoleIndex) {
        next()
    } else {
        res.status(403).json({
            message: 'Access denied. Insufficient administrative level.',
        })
    }
}
