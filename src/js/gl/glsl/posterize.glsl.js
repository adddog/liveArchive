export const define = `
          #define GAMMA 0.65
          #define REGIONS 5.
          #define LINES 0.5
          #define BASE 2.5
          #define PI 3.14159265359
          #define GREEN_BIAS 0.9
`
export const frag = `
          vec3 Posterize(vec3 color)
          {
            color = pow(color, vec3(GAMMA, GAMMA, GAMMA));
            color = floor(color * REGIONS)/REGIONS;
            color = pow(color, vec3(1.0/GAMMA));
            return color.rgb;
          }

`
