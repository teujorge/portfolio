import { Image as DImage, ImageProps, useScroll } from "@react-three/drei";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils, Mesh } from "three";
("use client");

export function Slides() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Slide
        position={[0, 0, 0]}
        images={[
          {
            scale: [5, 7],
            url: "https://mjorge.me/images/me/kids.png",
          },
          {
            scale: [7, 5],
            url: "https://mjorge.me/images/me/beach.png",
          },

          {
            scale: [5, 5],
            url: "https://mjorge.me/images/me/hike.jpg",
          },
        ]}
      />

      <Slide
        position={[width * 1, 0, 0]}
        images={[
          {
            scale: [5, 7],
            url: "https://mjorge.me/images/demos/atlas.webp",
          },
          {
            scale: [7, 5],
            url: "https://mjorge.me/images/demos/movie-matter.webp",
          },

          {
            scale: [5, 5],
            url: "https://mjorge.me/images/demos/pollist.webp",
          },
        ]}
      />

      <Slide
        position={[width * 2, 0, 0]}
        images={[
          {
            scale: [5, 7],
            url: "https://mjorge.me/images/me/kids.png",
          },
          {
            scale: [7, 5],
            url: "https://mjorge.me/images/me/beach.png",
          },

          {
            scale: [5, 5],
            url: "https://mjorge.me/images/me/hike.jpg",
          },
        ]}
      />
    </>
  );
}

type UrlImageProps = ImageProps & { url: string };

type SlideProps = {
  images: [UrlImageProps, UrlImageProps, UrlImageProps];
} & GroupProps;

function Slide({ images, ...props }: SlideProps) {
  const ref = useRef(null);
  const { width } = useThree((state) => state.viewport);

  const isSmall = width < 12;
  const isTiny = width < 9;

  console.log("width", width);
  console.log("isSmall", isSmall);
  console.log("isTiny", isTiny);

  return (
    // @ts-ignore
    <group ref={ref} {...props}>
      {!isTiny && (
        <DreiImage
          position={[(-width / 3) * (isSmall ? 0.5 : 0.75), 0, 0]}
          scale={images[0].scale ?? [5, 7]}
          url={images[0].url}
        />
      )}
      {!isSmall && (
        <DreiImage
          position={[0, 0, 1]}
          scale={images[1].scale ?? [5, 7]}
          url={images[1].url}
        />
      )}
      <DreiImage
        position={[(width / 3) * (isSmall ? 0.1 : 0.8), 0, 2]}
        scale={images[2].scale ?? [5, 7]}
        url={images[2].url}
      />
      {/* @ts-ignore */}
    </group>
  );
}

function DreiImage(props: ImageProps) {
  const ref = useRef<Mesh>(null);
  const group = useRef<Group>(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (group.current && ref.current && data) {
      // zoom in effect
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        -Math.max(0, data.delta * 50),
        4,
        delta
      );

      // grayscale effect
      // @ts-ignore
      ref.current.material.grayscale = MathUtils.damp(
        // @ts-ignore
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      );
    }
  });
  return (
    // @ts-ignore
    <group ref={group}>
      <DImage ref={ref} {...props} />
      {/* @ts-ignore */}
    </group>
  );
}
