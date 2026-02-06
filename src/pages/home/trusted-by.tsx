import { svgLinks } from "@/assets/assetLink"

export const TrustedBy = () => {
    const logos =[svgLinks.univaciti,svgLinks.qoonity,svgLinks.qucoon,svgLinks.rubies]
  return (
    <div className="items-center flex flex-col justify-center mt-10"><p>Trusted by big brands around the world</p>
    <div className="flex flex-row gap-5 mt-2">{logos.map((logo)=><img src={logo} alt="logo" />)}</div>
    </div>
  )
}
