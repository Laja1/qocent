import { svgLinks } from "@/assets/assetLink";
import { InfiniteSlider } from "./home/solution";

export const TrustedBy = () => {
  const logos = [svgLinks.univaciti, svgLinks.tymer, svgLinks.qoonity, svgLinks.qucoon, svgLinks.rubies,]

  return (
    <div className="">
      <p>Trusted by big brands around the world</p>

      <InfiniteSlider
        items={logos}
        itemWidth={200}
        itemHeight={60}
        duration={20}
        renderItem={(logo) => {
          return (
            <div className="">
              <img src={logo} alt="logo" />
            </div>
          );
        }}
      />
    </div>
  )
}
