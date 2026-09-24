-- Sample Dummy Data for Cloudflare D1 Database (psikotest-db)
-- Execute this query in Cloudflare D1 Console if you wish to insert a sample test response.

INSERT INTO responses (
  id,
  age,
  gender,
  consent,
  answers,
  scores,
  user_agent,
  country,
  is_retest,
  retest_of
) VALUES (
  '85a6b44c-d8cd-41e2-a788-7849ad018261',
  28,
  'female',
  1,
  '[3,4,5,4,5,2,4,4,1,5,2,4,5,5,5,2,4,4,1,5,2,4,4,2,5,2,5,4,5,2,2,4,5,4,5,2,4,4,1,1,2,4,5,5,5,2,4,2,1,5,4,4,4,2,5,2,5,3,5,2,2,4,2,4,5,2,1,1,1,2,2,4,2,2,2,2,4,2,1,5,4,4,4,2,2,2,5,2,5,2,2,4,5,2,5,2,1,1,1,5,2,2,4,5,5,2,2,2,1,5,4,4,4,2,2,2,5,2,5,2]',
  '{"N":{"key":"N","name":"Neuroticism","totalScore":52,"meanScore":2.17,"level":"Low"},"E":{"key":"E","name":"Extraversion","totalScore":92,"meanScore":3.83,"level":"High"},"O":{"key":"O","name":"Openness","totalScore":98,"meanScore":4.08,"level":"High"},"A":{"key":"A","name":"Agreeableness","totalScore":94,"meanScore":3.92,"level":"High"},"C":{"key":"C","name":"Conscientiousness","totalScore":102,"meanScore":4.25,"level":"High"}}',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'ID',
  0,
  NULL
);
