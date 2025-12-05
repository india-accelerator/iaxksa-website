import { Navbar01 } from '@/components/layout/navbar-01';
import { StartupApplicationFormComponent } from '@/components/forms/startup-application-form';
import { Footer } from '@/components/layout/footer';

export default function ApplyPage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar01 />
      <StartupApplicationFormComponent />
      <Footer />
    </div>
  );
}
