'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { ProductsService, OnboardingService } from '@/services/rest.service';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/ui/DataTable';

export default function HomePage() {
  const { setLoading } = useLoading();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [totals, setTotals] = useState({ products: 0, onboardings: 0 });

  useEffect(() => {
    const container = document.getElementById('product-slider');
    if (!container || products.length <= 2) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % products.length;
      const scrollAmount = container.clientWidth * (index / 2);
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 2000);

    return () => clearInterval(interval);
  }, [products]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [prodRes, onboardRes] = await Promise.all([
          ProductsService.getAll({ limit: 5, page: 1 }),
          OnboardingService.getAll({ limit: 5, page: 1 }),
        ]);

        setProducts(
          (prodRes.data || [])
            .sort((a: any, b: any) => b.rate - a.rate)
            .slice(0, 3)
        );
        setOnboardings(onboardRes.data || []);
        setTotals({
          products: prodRes.meta?.totalItems || prodRes.data?.length || 0,
          onboardings: onboardRes.meta?.totalItems || onboardRes.data?.length || 0,
        });
      } catch {
        toast.error('Error al cargar datos del panel');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setLoading]);

  return (
    <div className="flex flex-col flex-1 bg-gray-100 min-h-[calc(100vh-160px)] overflow-hidden p-6 space-y-4">
      <div className="flex-1 basis-[35%] bg-white rounded-2xl shadow p-6 grid grid-cols-5 gap-8 items-center">
        <div className="col-span-3 flex flex-col items-center justify-center text-center">
          <Icon
            icon="mdi:hand-wave-outline"
            width={60}
            height={60}
            className="text-blue-600 mb-3 animate-bounce"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-gray-600 text-base max-w-md leading-relaxed">
            Has iniciado sesión correctamente. Explora las opciones del menú para gestionar
            tus productos y solicitudes de apertura de cuenta.
          </p>
        </div>

        <div className="col-span-2 flex items-center justify-between gap-4 h-full">
          <div className="flex-1 bg-gray-50 rounded-xl shadow-inner p-4 flex flex-col items-center justify-center hover:shadow-md transition h-full">
            <Icon icon="mdi:shopping-outline" width={30} className="text-blue-600 mb-2" />
            <h3 className="text-gray-800 text-base font-semibold mb-1">Productos</h3>
            <span className="text-3xl font-bold text-gray-900 mb-2">{totals.products}</span>
            <button
              onClick={() => {
                setLoading(true);
                router.push('/products');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer text-sm"
            >
              <Icon icon="mdi:open-in-new" width={16} />
              Ver módulo
            </button>
          </div>

          <div className="flex-1 bg-gray-50 rounded-xl shadow-inner p-4 flex flex-col items-center justify-center hover:shadow-md transition h-full">
            <Icon icon="mdi:account-plus-outline" width={30} className="text-green-600 mb-2" />
            <h3 className="text-gray-800 text-base font-semibold mb-1">Onboardings</h3>
            <span className="text-3xl font-bold text-gray-900 mb-2">{totals.onboardings}</span>
            <button
              onClick={() => {
                setLoading(true);
                router.push('/onboarding');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer text-sm"
            >
              <Icon icon="mdi:open-in-new" width={16} />
              Ver módulo
            </button>
          </div>
        </div>
      </div>

      <div className="flex-[1.8] bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-2 gap-8 hover:shadow-lg transition">
        <div className="bg-gray-100 p-6 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="mdi:chart-line" width={22} className="text-blue-600" />
              Productos más rentables
            </h2>
          </div>

          {products.length > 0 ? (
            <div
              id="product-slider"
              className="flex overflow-hidden gap-6 pb-2"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
              }}
            >
              {products.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[40%] h-48 flex-shrink-0 border rounded-xl p-5 bg-white scroll-snap-align-start 
             flex flex-col justify-between items-center text-center hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-2">{p.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  </div>

                  <p className="text-lg font-bold text-green-600 mt-2">{p.rate}% Tasa</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm text-center">
              No hay productos registrados aún.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="mdi:file-document-outline" width={22} className="text-green-600" />
              Últimas solicitudes de apertura
            </h2>
          </div>

          {onboardings.length > 0 ? (
            <DataTable
              columns={[
                { header: 'Nombre', accessor: 'name' },
                { header: 'Documento', accessor: 'document' },
                { header: 'Email', accessor: 'email' },
                {
                  header: 'Estado',
                  accessor: (o: any) => {
                    const status = o.status?.toUpperCase?.() || '—';
                    const statusStyles: Record<string, string> = {
                      REQUESTED: 'bg-yellow-100 text-yellow-700 border-yellow-300',
                      APPROVED: 'bg-blue-100 text-blue-700 border-blue-300',
                      REJECTED: 'bg-red-100 text-red-700 border-red-300',
                    };
                    return (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] ||
                          'bg-gray-100 text-gray-600 border-gray-300'
                          }`}
                      >
                        {status}
                      </span>
                    );
                  },
                  className: 'text-center',
                },
              ]}
              data={onboardings.slice(0, 4)}
            />
          ) : (
            <p className="text-gray-500 italic text-sm text-center">
              No hay solicitudes registradas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
