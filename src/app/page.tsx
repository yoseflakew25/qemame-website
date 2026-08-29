import Loader from '@/components/common/Loader';
import ProgressBar from '@/components/common/ProgressBar';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import Hero from '@/components/common/Hero';
import About from '@/components/common/About';
import Legend from '@/components/common/Legend';
import Terroir from '@/components/common/Terroir';
import CuppingBench from '@/components/common/CuppingBench';
import Gallery from '@/components/common/Gallery';
import Export from '@/components/common/Export';
import Values from '@/components/common/Values';
import Quality from '@/components/common/Quality';
import Team from '@/components/common/Team';
import Contact from '@/components/common/Contact';
import Tibeb from '@/components/ui/Tibeb';
import Ticker from '@/components/ui/Ticker';

export default function Home() {
  return (
    <>
      <Loader />
      <a className="skip" data-target="#origin">Skip to the story</a>
      <ProgressBar />
      <Navigation />

      <main id="top">
        <Hero />
        <Ticker />
        <About />
        <Tibeb />
        <Legend />
        <Tibeb flip />
        <Terroir />
        <Tibeb />
        <CuppingBench />
        <Tibeb flip />
        <Gallery />
        <Tibeb />
        <Export />
        <Tibeb flip />
        <Values />
        <Tibeb />
        <Quality />
        <Tibeb flip />
        <Team />
        <Tibeb />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
