# Father's Day Promotion Archive

This folder contains the archived Father's Day promotion that was removed from the active website.

## Contents
- `page.js` - The complete Father's Day promotion page
- Images are stored in `public/images/archive/promotions/fathers-day/`

## How to Restore for Next Year

1. **Move the page back to active location:**
   ```bash
   move src/archive/promotions/fathers-day/page.js src/app/promotions/fathers-day/page.js
   ```

2. **Move images back to active location:**
   ```bash
   move public/images/archive/promotions/fathers-day/* public/images/promotions/
   ```

3. **Add navigation link back to navbar:**
   - Edit `src/components/layout/navbar.js`
   - Add `{ name: "Father's Day Special", href: "/promotions/fathers-day" }` to the navItems array

4. **Update promotions data:**
   - Edit `src/data/promotions.js`
   - Add Father's Day promotion data back

5. **Update image paths in the page:**
   - Change all image paths from `/images/archive/promotions/fathers-day/` back to `/images/promotions/`

## Notes
- The promotion was archived on: October 13, 2025
- All image paths have been updated to point to the archive location
- The page is fully functional and ready to be restored when needed
