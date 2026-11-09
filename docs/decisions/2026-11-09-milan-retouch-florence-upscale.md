# Milan selfie correction and Florence upscaling trial

The user pointed out that the Milan Cathedral selfie shown in the Chanel chapter still had a backpack and chest strap. The prior edit had only removed bags from the separate old-town photograph. Replace this specific Milan selfie as well.

## Milan portrait

- Existing source asset: `/life/italy/milan-portrait.webp`, 2316×3088; it remains unchanged in the repository. The original supplied photograph also remains in the user's Photos library.
- New display derivative: `/life/italy/milan-portrait-edited.png`, 1087×1447. Remove the backpack, shoulder straps and diagonal chest bag and reconstruct the white T-shirt. Use this derivative only in the Milan location inset.
- The original image-generation output reconstructs some pixels across the photo. Preserve its framing and avoid presenting it as the untouched camera original.

## Florence sharpness

- The supplied Florence image is 1126×837. A generated enhancement sample reached 1455×1081, but visibly changed facial and city detail. It remains a local sample and is not published; the authentic source stays on the website.
- If the user wants to improve the existing photo with less re-rendering, Lightroom/Camera Raw Super Resolution produces twice the linear pixel dimensions. Topaz Photo offers both artifact correction at 1× and larger upscales; its documentation cautions that AI models can create artifacts when the source quality is very low. References: [Adobe Super Resolution](https://www.adobe.com/products/photoshop-lightroom/super-resolution.html) and [Topaz Photo upscale and resize](https://docs.topazlabs.com/topaz-photo/enhancements/upscale-and-resize).

## Review

The screenshot clarified that the still-visible backpack was a different source image from the previously edited old-town photo. Check the actual Milan inset after replacement. Do not replace the Florence original with the generated enhancement unless the user approves that visibly re-rendered result.

The production build, Astro diagnostics, lint and diff checks passed. The Cloudflare preview returned the edited image at 1087×1447 in the Milan inset: https://83b38990-gabriel-portfolio.gabrielchen.workers.dev/.
