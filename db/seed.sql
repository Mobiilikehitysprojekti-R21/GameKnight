-- USERS
INSERT INTO users (email, auth0_id, nickname) VALUES
  ('alli@esimerkki.fi', 'auth0ID', 'Alli'),
  ('pertti@esimerkki.fi', 'auth0ID', 'Pertti'),
  ('roope@esimerkki.fi', 'auth0ID', 'Roope');

-- GROUP
INSERT INTO groups (name) VALUES
  ('PerjantaiPelaajat');

-- GROUP MEMBERS
INSERT INTO group_members (group_id, user_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3);

-- BOARD GAME
INSERT INTO boardgames (
  bgg_id, name, year_published, rank, bayes_average, average, users_rated
) VALUES (
  174430, 'Gloomhaven', 2017, 3, 8.50, 8.60, 60000
);

-- LOCATION
INSERT INTO locations (name, latitude, longitude) VALUES
  ('Allin koti', 65.0121, 25.4651);

-- SESSION
INSERT INTO sessions (
  group_id, game_id, played_at, location_id, notes
) VALUES (
  1, 1, now(), 1, 'Eka testi sessio'
);

-- SESSION PLAYERS
INSERT INTO session_players (session_id, user_id, score, is_winner) VALUES
  (1, 1, 120, true),
  (1, 2, 95, false),
  (1, 3, 80, false);

-- FRIENDSHIPS
INSERT INTO friendships (user_id, friend_id, status) VALUES
  (1, 2, 'accepted'),
  (1, 3, 'pending');


--TESTING
SELECT
  s.session_id,
  g.name AS group_name,
  b.name AS game_name,
  s.played_at
FROM sessions s
JOIN groups g ON g.group_id = s.group_id
JOIN boardgames b ON b.game_id = s.game_id;

SELECT
  u.nickname,
  sp.score,
  sp.is_winner
FROM session_players sp
JOIN users u ON u.user_id = sp.user_id
WHERE sp.session_id = 1;

SELECT
  u.nickname,
  f.status
FROM friendships f
JOIN users u ON u.user_id = f.friend_id
WHERE f.user_id = 1;
