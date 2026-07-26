import Header from "./header/Header.jsx";
import SideSectionNav from "./header/SideSectionNav.jsx";
import { useHeaderState, NAV_ITEMS } from "./header/useHeaderState.js";
import Hero from "./hero/Hero.jsx";
import HeroMockupCard from "./hero/HeroMockupCard.jsx";
import Features from "./features/Features.jsx";
import FeaturesCardsGrid from "./features/FeaturesCardsGrid.jsx";
import GridFlowPreview from "./gridflow/GridFlowPreview.jsx";
import GridFlowDiagramNodes from "./gridflow/GridFlowDiagramNodes.jsx";
import SavingsCalculator from "./calculator/SavingsCalculator.jsx";
import HowItWorks from "./howitworks/HowItWorks.jsx";
import ImpactTracker from "./impact/ImpactTracker.jsx";
import ImpactMetricsGrid from "./impact/ImpactMetricsGrid.jsx";
import FAQ from "./faq/FAQ.jsx";
import FaqAccordionList from "./faq/FaqAccordionList.jsx";
import Footer from "./footer/Footer.jsx";
import FooterLinksNav from "./footer/FooterLinksNav.jsx";
import ToastLiveTrade from "./toast/ToastLiveTrade.jsx";

export {
  LANDING_SECTION_IDS,
  LANDING_CONFIG,
  FEATURE_CATEGORIES,
  SUPPORTED_DISCOMS,
} from "./landingConfigData.js";

export {
  Header,
  SideSectionNav,
  useHeaderState,
  NAV_ITEMS,
  Hero,
  HeroMockupCard,
  Features,
  FeaturesCardsGrid as FeatureCardsGrid,
  GridFlowPreview,
  GridFlowDiagramNodes as GridDiagramNodes,
  SavingsCalculator,
  HowItWorks,
  ImpactTracker,
  ImpactMetricsGrid,
  FAQ,
  FaqAccordionList,
  Footer,
  FooterLinksNav,
  ToastLiveTrade as LiveTradeToast,
};

const LandingComponents = {
  Header,
  Hero,
  Features,
  GridFlowPreview,
  SavingsCalculator,
  HowItWorks,
  ImpactTracker,
  FAQ,
  Footer,
  LiveTrade: ToastLiveTrade,
  LiveTradeToast: ToastLiveTrade,
};

export default LandingComponents;

