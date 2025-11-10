'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import { OnboardingService } from '@/services/rest.service';
import PageContainer from '@/components/layout/PageContainer';
import { Icon } from '@iconify/react';
import OnboardingForm from '../components/OnboardingForm';

export default function ViewOnboardingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { setLoading } = useLoading();
  const [onboarding, setOnboarding] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await OnboardingService.getById(id);
        setOnboarding(res.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setLoading]);

  if (notFound) {
    return (
      <PageContainer
        title={
          <div className="flex items-center gap-2">
            <Icon icon="mdi:alert-circle-outline" className="text-red-500" width={26} />
            <span>Onboarding no encontrado</span>
          </div>
        }
      >
        <p className="text-center text-gray-500 py-10">
          El registro solicitado no existe o fue eliminado.
        </p>
      </PageContainer>
    );
  }

  if (!onboarding) return null;

  return (
    <PageContainer
      title={
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/onboarding')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer"
            title="Volver a Onboarding"
          >
            <Icon icon="mdi:arrow-left" width={22} height={22} />
          </button>

          <Icon icon="mdi:eye-outline" className="text-blue-600" width={26} />
          <span>Ver Onboarding</span>
        </div>
      }
    >
      <OnboardingForm mode="view" id={id} initialData={onboarding} />
    </PageContainer>
  );
}
