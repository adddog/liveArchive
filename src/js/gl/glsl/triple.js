const VERTEX_BUFFER = [0, 0, 0, 1, 1, 0, 1, 1];
// import { hangedMan, temperance, stroke } from "spirit-deck";
import * as Posterize from "./posterize.glsl";

const Double = (regl, props) => {
  return regl({
    vert: `
            precision lowp float;
            attribute vec2 position;
            uniform mat4 projection, view, model;
            varying vec2 vUv;

            void main () {
              vUv = position;
              vec2 adjusted = 1.0 - 2.0 * position;
              vec4 pos =  vec4(adjusted,0,1);
              gl_Position =  pos;
            }
         `,

    frag: `
          ${Posterize.define}

          precision lowp float;
          uniform sampler2D tex0;
          uniform sampler2D tex1;
          uniform sampler2D tex2;
          uniform vec4 xFlips;
          uniform float tolerance;
          uniform float slope;
          varying vec2 vUv;

          ${Posterize.frag}

          float chromaKeyAlphaTwoFloat(vec3 color, vec3 keyColor, float tolerance, float slope)
            {
              float d = abs(length(abs(keyColor - color)));
              float edge0 = tolerance * (1.0 - slope);
              float alpha = smoothstep(edge0, tolerance, d);
              return 1. - alpha;
            }

          float luma(vec3 color) {
            return dot(color, vec3(0.299, 0.587, 0.114));
          }


          void main() {
           vec2 uv = vUv;
           vec2 uv0 = vUv;
           vec2 uv1 = vUv;
           vec2 uv2 = vUv;
           uv0.x = abs(xFlips.x - uv0.x);
           uv1.x = abs(xFlips.y - uv1.x);
           uv2.x = abs(xFlips.z - uv2.x);
           vec3 vid0 = texture2D(tex0, uv0).rgb;
           vec3 vid1 = texture2D(tex1, uv1).rgb;
           vec3 vid2 = texture2D(tex2, uv2).rgb;
           vec3 keyColor = vec3(0.,0.,0.);

           float webcamKeyColor = chromaKeyAlphaTwoFloat(
               vec3(luma(vid0)),
               clamp(keyColor, 0.0, 1.),
               clamp(tolerance, 0.0001, 1.),
               clamp(slope, 0.001, 1.)
            );

            vec3 webcamMixedColor = mix(vid0, vid1, webcamKeyColor);

            float webcamKeyColor2 = chromaKeyAlphaTwoFloat(
               vec3(luma(webcamMixedColor)),
               clamp(keyColor, 0.0, 1.),
               clamp(tolerance, 0.0001, 1.),
               clamp(slope, 0.001, 1.)
            );

            gl_FragColor = vec4(mix(webcamMixedColor,vid2,webcamKeyColor2),1);
          }

          `,

    uniforms: {
      tex0: regl.prop("tex0"),
      tex1: regl.prop("tex1"),
      tex2: regl.prop("tex2"),
      xFlips: regl.prop("xFlips"),
      tolerance: regl.prop("tolerance"),
      slope: regl.prop("slope"),
    },
    attributes: {
      position: VERTEX_BUFFER,
    },
    primitive: "triangle strip",
    count: 4,
  })
};

export default Double;
