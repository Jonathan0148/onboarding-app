'use client';

import { useEffect, useState } from 'react';
import { OnboardingService } from '@/services/rest.service';
import { useLoading } from '@/context/LoadingContext';
import PageContainer from '@/components/layout/PageContainer';
import { Icon } from '@iconify/react';
import DataTable from '@/components/ui/DataTable';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { setLoading } = useLoading();
  const router = useRouter();

  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOnboardings = async (term = '', pageNum = 1) => {
    setLoading(true);
    try {
      const res = await OnboardingService.getAll({
        page: pageNum,
        limit: 4,
        term: term || undefined,
      });
      setOnboardings(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setPage(res.meta?.currentPage || 1);
    } catch {
      toast.error('Error al cargar onboardings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnboardings();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOnboardings(search, 1);
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Documento', accessor: 'document' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Monto inicial',
      accessor: (o: any) => {
        const value = Number(o.initialAmount) || 0;
        const formatted = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(value);
        return <span className="font-medium text-gray-800">{formatted}</span>;
      },
      className: 'text-right',
    },
    { header: 'Producto', accessor: 'productName' },
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
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              statusStyles[status] ||
              'bg-gray-100 text-gray-600 border-gray-300'
            }`}
          >
            {status}
          </span>
        );
      },
      className: 'text-center',
    },
    {
      header: 'Acciones',
      accessor: (o: any) => (
        <div className="flex justify-center items-center gap-3 py-1">
          <button
            onClick={() => {
              setLoading(true);
              router.push(`/onboarding/${o.onboardingId}`)}
            }
            className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
            title="Ver"
          >
            <Icon icon="mdi:eye-outline" width={20} height={20} />
          </button>
        </div>
      ),
      className: 'text-center w-[100px]',
    },
  ];

  return (
    <PageContainer
      title={
        <div className="flex items-center gap-2">
          <Icon icon="mdi:account-plus-outline" className="text-blue-600" width={26} />
          <span>Onboarding</span>
        </div>
      }
      action={
        <button
          onClick={() => {
            setLoading(true);
            router.push('/onboarding/new')
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="mdi:plus" />
          Nuevo Onboarding
        </button>
      }
    >
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, documento o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 cursor-pointer"
        >
          <Icon icon="mdi:magnify" width={20} />
          Buscar
        </button>
      </form>

      <DataTable columns={columns} data={onboardings} />

      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => fetchOnboardings(search, page - 1)}
          className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
        >
          <Icon icon="mdi:chevron-left" width={20} />
        </button>
        <span className="text-gray-600">
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => fetchOnboardings(search, page + 1)}
          className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
        >
          <Icon icon="mdi:chevron-right" width={20} />
        </button>
      </div>
    </PageContainer>
  );
}
