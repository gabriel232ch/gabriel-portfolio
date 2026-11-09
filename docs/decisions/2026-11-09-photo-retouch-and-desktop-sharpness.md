# New old-town photograph and desktop hero sharpness

The user requested adding a supplied portrait taken in an old-town street, removing its backpack and crossbody bag, and improving the wide-screen Florence opening, which looked soft while remaining effective on phones.

## Presentation

- Add the retouched old-town portrait as the fourth small personal-moment photograph. Keep the existing 2×2 phone and four-column desktop rhythm; the portrait is the last tile and retains the full scenic framing.
- Keep the mobile Florence layout as it is. At 72rem and wider, let the existing dark-blue hero background show at the left and cap the Florence photograph at 70.375rem (1126 CSS pixels), aligned to the right. This matches its 1126-pixel source width and avoids stretching it across very wide displays. The existing gradient still protects the left-side type where the photo reaches behind it.
- Keep other page imagery and case content unchanged.

## Image edit

- Source supplied by the user: `5A1AE0C1-0B68-4222-B890-602135F7D7FC.jpeg`, 3024×4032 (19.1 MB). Its SHA-256 is `9c0635b88022d03530d34cf2a26a23cae3cf46ea11d6938b0904366670dd9bec`.
- Used the image-generation edit tool at the user's explicit request to remove the shoulder straps, backpack and crossbody bag, while retaining the person, pose, shirt, street and framing. The user's source remains untouched in Photos.
- The edit output is a 1086×1448 PNG. This is a retouched derivative, not the 3024×4032 source; its tile remains below the fold and is sized well below its pixel width. No location is asserted because the user did not name one.

## Review

The new desktop cap addresses the source limit through layout rather than fabricated detail. On 2× displays, a 1126-pixel source can still appear a little soft at native CSS width; an even sharper full-width desktop hero would need a higher-resolution Florence original. The mobile composition and its existing apparent sharpness are unaffected.

The earlier statement that no AI retouching was used described the original GAB-20 photographs. This user-authorized edit is a later, limited exception for the newly supplied old-town photograph only. The supplied city photo remains personal context and is not connected to any research claim.

## Preview verification

- Local production build, Astro diagnostics, lint and `git diff --check` pass.
- Desktop previews at 1440px and 1920px display the 1126px Florence source at 1126 CSS pixels; the 390px phone layout still uses the full-width image and has no horizontal overflow.
- The new photo loads as a 1086×1448 image. Its four-moment layout uses four columns on desktop and two columns on phones.
- Immutable Cloudflare preview: https://35550038-gabriel-portfolio.gabrielchen.workers.dev/
