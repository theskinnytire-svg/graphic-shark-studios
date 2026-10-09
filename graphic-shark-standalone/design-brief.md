# Graphic Shark Studios — design brief (V1)

## Design read
A small, hungry California studio selling websites, e-commerce builds, print and
AI media to owners of real businesses. The register is confident and a little
loud: the energy of an early-90s skate video deck graphic, executed with modern
typographic discipline. It should feel like a crew that ships, not an agency
that presents.

## Concept spine
**The part.** The page is a skate video part. One continuous camera line, taken
in a single take, runs under the whole story, and the studio's voice narrates
over it. A skate deck is the spine object: a blank deck is a canvas, a printed
deck is design, a glowing deck is the web. Print becoming digital is the whole
pitch, shown rather than claimed.

## Delivery tier
`cinema`. Lenis + GSAP for surrounding motion, one Tier-1 scroll-scrub journey
(the film), bespoke chrome per CTA. Not `spectacle`: no WebGL, no custom cursor.

## Locked palette
- Tarmac `#0B0A0F` ground (off-black aubergine, never pure black)
- Deep Cobalt `#1A2470` structural field
- Cobalt `#2B3ACF` structural field, brighter, used for large planes and duotone
- Grip Pink `#FF2D6F` the single accent, used decisively and sparingly
- Paper `#F4EFE7` primary type on dark
- Steel `#8B8AA0` secondary type, hairlines, metadata
Defense: Tyler named a darker pink-and-blue 90s skate palette explicitly. Pink
is the one accent; blue carries structure as large planes, never as a second
accent hue. No third hue anywhere. No violet glow, no gradient slop.

## Locked type
- Display: **Cabinet Grotesk** (Fontshare), set tight and often uppercase.
  Compressed, poster-weight, reads as a 90s deck graphic without being retro-kitsch.
- Body: **Inter Tight**, 16/1.6, max 65ch.
- Labels, numbers, tags, form labels: **JetBrains Mono**, uppercase, small, wide tracking.
Justification for any serif: none used.

## Animation mode
`animated-website`

## Journey shape
`single-shot`. The subject is one object seen closer and closer, so seams would
cost more than they add.

## Journey
ONE ~15s continuous film: a low-angle orbit that pushes slowly in on a matte
black skateboard deck standing in a dark void while its underside transforms,
blank to halftone screen print to glowing screen to pixel dissolve. Four
chapters read over it, each mapped to a moment of that transform:

1. **Sites that pull their weight.** Focal: the blank, rim-lit deck. Body: we
   build brochure and e-commerce sites that carry their own weight. Tags:
   Brochure sites / E-commerce.
2. **Design that travels.** Focal: the halftone print flooding across the deck.
   Body: one identity that works on a screen, a deck and a shirt. Tags: Logo
   design / Merch design / Print.
3. **AI, without the smell of it.** Focal: the surface turning into a glowing
   hairline grid. Body: AI content and review videos art-directed to the brand,
   never generic. Tags: AI content / AI review videos.
4. **Looks unreal on the phone.** Focal: pixel blocks dissolving off the deck.
   Body: every build is designed at 390px first. Tags: Mobile first / Optimized.
The journey enacts the concept spine: the visitor's thumb drives the deck from
print to screen exactly as the studio does for a client.

## World grammar
One byte-identical style preamble for the film and the kit: seamless near-black
aubergine void `#0B0A0F`; palette strictly `#0B0A0F #1A2470 #2B3ACF #FF2D6F
#F4EFE7`; matte surfaces with coarse halftone screen-print texture; hard magenta
rim light from the left, cool cobalt fill from the right; locked exposure, soft
film grain, shallow depth of field; 35mm product-film lens; no text of any kind
in any generated asset.

## Mobile framing
Mobile is the point of this site, so the journey keeps the deck center-safe
inside a 9:16 crop and the copy sits in the lower third. Lighter mobile encodes
(720p, GOP 4) load by default under 860px or on a coarse pointer.

## Delivery budget
Desktop clip ≤ 32 MiB, mobile clip ≤ 16 MiB. One clip each, so this is comfortable.

## Section plan
1. Nav (single line, ≤80px) + journey hero (layout family: full-bleed film with
   bottom-left type)
2. Services index, seven rows, hairline rules, hover preview sliver (family:
   full-width index rows) 
3. Selected work, staggered masonry with a filter rail (family: off-grid masonry)
4. Mobile showcase, three phone screens off-axis on a cobalt field (family: image
   as canvas, type overlapping)
5. Process, four steps with oversized outlined numerals (family: stacked
   center-left rhythm)
6. Identity and merch band, marquee plus layered frames (family: full-width band)
7. Closing CTA band plus footer (family: banner CTA and column footer)
Seven sections, five distinct families, no consecutive repeats. Eyebrow budget
ceil(7/3) = 2: only the services index and the process rail carry one.

## Asset plan
- Hero: the film's own encoded clip and its exact-frame posters (no second hero film)
- Section plates: halftone cobalt plate (services), riso misregistration plate (merch band)
- Content imagery: six project tiles (two website crops, one storefront, one
  identity mark set, one deck graphic stack, one apparel flat lay) plus one
  cinematic AI-media still
- Custom icon set: one sheet of eight 2px-stroke glyphs on the brand ground, sliced
- Logo family: shark head mark (nav, footer, favicon source) plus the branding
  run's cover, OG and app icon
- Head kit: favicon set, apple touch icon, webmanifest, OG tags, theme color
- Two rules plates for the form pages: quote page rail and demo page rail

## CTA inventory
Every CTA is its own component with its own interaction identity:
1. Nav "Start a project" — compact outlined mono pill that fills pink on hover
2. Hero primary "Request a quote" — wide pink slab that slides its own label up on hover
3. Hero secondary "See the work" — inline underlined link with a drawn underline
4. Services row CTA — the whole row is the control, pink arrow slides in on hover
5. Work tile — the tile is the control, caption rail lifts on hover
6. Mobile section "Request a demo" — framed block button with a corner tick
7. Merch band CTA — oversized headline with a tiny mono "See how we do it" hint
8. Footer CTAs — mono text links with a pink caret, plus a hard pink block "Request a quote"
