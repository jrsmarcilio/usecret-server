-- This is an empty migration.
INSERT INTO
  Profile
VALUES
  (
    default,
    'Admin',
    'Perfil root do sistema',
    default,
    now()
  );

INSERT INTO
  UserGroup
VALUES
  (
    default,
    'Admin',
    'Grupo de usuário root do sistema',
    default,
    now()
  );