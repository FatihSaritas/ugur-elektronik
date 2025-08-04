import React from 'react'
import '../assets/css/Brands.css'

const brands = [
  {
    name: 'Arçelik',
    url: 'https://www.arcelik.com.tr/?&&&&ds_rl=1302519&gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrF9Wdbsq6Y1J4O-zp0FZsxLQ6c_JlY14egwjhJssdbIazT-K2URdJhoColMQAvD_BwE&gclsrc=aw.ds',
    img: require('../assets/img/Brands/arcelik.jpeg'),
  },
  {
    name: 'Vestel',
    url: 'https://www.vestel.com.tr/?gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrOXo8xq5Hqoc0wklStGsusKtm0f76tFpMHfOn9n7rNYVI5PzD65ATxoCVBwQAvD_BwE&gclsrc=aw.ds',
    img: require('../assets/img/Brands/vestel.jpeg'),
  },
  {
    name: 'Philips',
    url: 'https://www.philips.com.tr/c-e/welcome.html?gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrDSq155rCKKqPpWOBvt4Ct5N3cIErCci_wjAIv-Iy7II03GaGhquERoCSogQAvD_BwE',
    img: require('../assets/img/Brands/phılıps.png'),
  },
  {
    name: 'Sony',
    url: 'https://www.sony.com.tr/electronics/support/televisions-projectors',
    img: require('../assets/img/Brands/sony.png'),
  },
  {
    name: 'LG',
    url: 'https://www.lg.com/tr/tv/',
    img: require('../assets/img/Brands/lg.png'),
  },
  {
    name: 'Samsung',
    url: 'https://www.samsung.com/tr/tvs/all-tvs/?cid=tr_pd_ppc_google_cn~shop-ctv-brand_bs~vd_pr~tv_sb~vdmul_ph~on_ca~kew_ks~ba_mk~tr_ob~con_fs~lo_mt~na_ff~ctvbrand_no-phase_cn~shop-ctv-brand_bs~vd_pr~tv_sb~vdmul_ph~on_ca~kew_ks~ba_mk~tr_ob~con_fs~lo_mt~na_ff~ctvbrand&utm_term=cn~shop-ctv-brand_bs~vd_pr~tv_sb~vdmul_ph~on_ca~kew_ks~ba_mk~tr_ob~con_fs~lo_mt~na_ff~ctvbrand&utm_content=none&gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrH_P5oR0WLw72dhn-OXputsPXnVYVaU2QsMYJQPC8RL54jfj0QxKxBoCIGgQAvD_BwE&gclsrc=aw.ds',
    img: require('../assets/img/Brands/samsung.png'),
  },
  {
    name: 'Sunny',
    url: 'https://www.sunny.com.tr/televizyonlar/',
    img: require('../assets/img/Brands/sunny.png'),
  },
  {
    name: 'Toshiba',
    url: 'https://toshiba-tv.com/tr-tr/support',
    img: require('../assets/img/Brands/unnamed.jpg'),
  },
  {
    name: 'Meanwell',
    url: 'https://www.ltech-led.eu/en-us/15-meanwell-led-power-supplies?gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrCKdTCCL2d734HcRzzDUDbdMXIzMRjRQlC1HtxJpyCgLlclK6kJpXRoCcOQQAvD_BwE',
    img: require('../assets/img/Brands/meanwell.png'),
  },
  {
    name: 'Osram',
    url: 'https://www.osram.com.tr/am/night-breaker-led.jsp',
    img: require('../assets/img/Brands/osram.jpeg'),
  },
  {
    name: 'Voltek',
    url: 'https://voltekelektrik.com.tr/led-ampul-ve-aksesuarlari',
    img: require('../assets/img/Brands/voltek.jpg'),
  },
  {
    name: 'SIEMENS',
    url: 'https://voltekelektrik.com.tr/led-ampul-ve-aksesuarlari',
    img: require('../assets/img/Brands/siemens.png')
  },
]

function Brands() {
  return (
    <section className="brands">
      <div className="container">
        <h1 className="brands-title">Çalışmakta Olduğumuz Firmalar</h1>
        <ul className="brand-list">
          {brands.map((brand, idx) => (
            <li className="brand-item" key={idx}>
              <a href={brand.url} target="_blank" rel="noopener noreferrer">
                <img src={brand.img} alt={brand.name} className="brand-img" />
              </a>
              <div className="brand-name">{brand.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Brands