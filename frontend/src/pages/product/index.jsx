import SEOMeta from "../../components/SEOMeta";
import GlobalProducts from "../../components/GlobalProducts";
import NewsGrid from "../../components/NewsGrid";

const Products = ()=> {

    return (
        <>
            <SEOMeta
              title="Global Products | MICHAEL AI, EAGLE, Crisis Atlas, Nostradamus"
              description="WDC's global disaster intelligence products: MICHAEL AI multi-hazard platform, EAGLE satellite damage assessment, Crisis Atlas live dashboard, and Nostradamus monthly forecasts for 195 countries."
              url="/global-products"
              keywords="MICHAEL AI disaster, EAGLE early warning, Crisis Atlas, Nostradamus disaster forecast, humanitarian AI platform, disaster monitoring technology, satellite disaster assessment"
            />
            <GlobalProducts /> 
            {/*<NewsGrid/>*/}
        </>
    )
}

export default Products;