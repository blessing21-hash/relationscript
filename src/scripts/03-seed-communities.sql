-- Seed some default communities
INSERT INTO communities (name, description, health_category, is_private) VALUES
  ('Anxiety Support Circle', 'A safe space to share experiences and coping strategies for anxiety', 'anxiety', false),
  ('Depression Warriors', 'Connect with others who understand the journey through depression', 'depression', false),
  ('ADHD Life Hacks', 'Share tips, tricks, and support for living with ADHD', 'adhd', false),
  ('Chronic Pain Community', 'Support and understanding for those living with chronic pain', 'chronic_pain', false),
  ('Bipolar Balance', 'A community for sharing experiences and finding balance with bipolar disorder', 'bipolar', false),
  ('PTSD Recovery', 'Healing together from trauma', 'ptsd', false),
  ('OCD Support Network', 'Understanding and managing OCD together', 'ocd', false);
