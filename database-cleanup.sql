-- Database cleanup script for removing test properties with mock image URLs
-- Run this in your Supabase SQL Editor to clean up test data

-- Option 1: Delete all properties with example.com image URLs
DELETE FROM properties 
WHERE images::text LIKE '%example.com%';

-- Option 2: Set images to empty array for properties with example.com URLs (if you want to keep the property data)
-- UPDATE properties 
-- SET images = '[]'::jsonb 
-- WHERE images::text LIKE '%example.com%';

-- Option 3: Delete all test properties (if you want a fresh start)
-- DELETE FROM properties 
-- WHERE title LIKE '%Test%' OR title = 'Test Listing 2';

-- Check remaining properties after cleanup
SELECT id, title, images FROM properties ORDER BY created_at DESC; 