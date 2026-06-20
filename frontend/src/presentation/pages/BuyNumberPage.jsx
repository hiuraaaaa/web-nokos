import { useState } from 'react';
import { useCatalog } from '../../usecases/useCatalog';
import { useBuyNumber } from '../../usecases/useBuyNumber';
import { ServiceGrid } from '../components/ServiceGrid';
import { CountryList } from '../components/CountryList';
import { OperatorList } from '../components/OperatorList';
import { OrderCard } from '../components/OrderCard';
import { EmptyState } from '../components/EmptyState';
import { SelectionSummary } from '../components/SelectionSummary';
import { PromoBanner } from '../components/PromoBanner';
import { VirtualNumberIntro } from '../components/VirtualNumberIntro';

function StepLabel({ number, text }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-sunken text-[11px] font-medium text-ink">
        {number}
      </span>
      <p className="text-sm font-medium text-ink">{text}</p>
    </div>
  );
}

export function BuyNumberPage() {
  const { services, countries, operators, loading, error, loadCountries, loadOperators } =
    useCatalog();
  const { activeOrder, creating, error: orderError, buyNumber, changeStatus, clearActiveOrder } =
    useBuyNumber();

  const [selectedService, setSelectedService] = useState(null);
  const [selectedPick, setSelectedPick] = useState(null); // { country, pricelistItem }

  const handleSelectService = (service) => {
    setSelectedService(service);
    setSelectedPick(null);
    loadCountries(service.code);
  };

  const handlePickCountry = (country, pricelistItem) => {
    setSelectedPick({ country, pricelistItem });
    loadOperators(country.name, pricelistItem.providerId);
  };

  const handlePickOperator = async (operator) => {
    if (!selectedPick) return;
    await buyNumber({
      numberId: selectedPick.country.numberId,
      providerId: selectedPick.pricelistItem.providerId,
      operatorId: operator.id,
    });
  };

  if (activeOrder) {
    return (
      <OrderCard order={activeOrder} onChangeStatus={changeStatus} onDismiss={clearActiveOrder} />
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      <PromoBanner />
      <VirtualNumberIntro />

      {(error || orderError) && (
        <p className="rounded-md border border-signal-rose-bg bg-signal-rose-bg px-4 py-2.5 text-sm text-signal-rose">
          {error || orderError}
        </p>
      )}

      {!selectedService ? (
        <section>
          <StepLabel number={1} text="Pilih layanan" />
          <ServiceGrid
            services={services}
            selected={selectedService}
            onSelect={handleSelectService}
            loading={loading.services}
          />
        </section>
      ) : (
        <SelectionSummary
          icon={
            <img src={selectedService.image} alt="" className="h-7 w-7 rounded-md object-contain" />
          }
          label={selectedService.name}
          sublabel="Layanan"
          onChange={() => {
            setSelectedService(null);
            setSelectedPick(null);
          }}
        />
      )}

      {selectedService && !selectedPick && (
        <section>
          <StepLabel number={2} text="Pilih negara & harga" />
          {!loading.countries && countries.length === 0 ? (
            <EmptyState
              title="Belum ada negara tersedia"
              description="Layanan ini belum punya stok negara aktif saat ini."
            />
          ) : (
            <CountryList countries={countries} loading={loading.countries} onPick={handlePickCountry} />
          )}
        </section>
      )}

      {selectedPick && (
        <SelectionSummary
          icon={
            <img
              src={selectedPick.country.image}
              alt=""
              className="h-7 w-7 rounded-sm object-contain"
            />
          }
          label={selectedPick.country.name}
          sublabel={selectedPick.pricelistItem.priceFormatted}
          onChange={() => setSelectedPick(null)}
        />
      )}

      {selectedPick && (
        <section>
          <StepLabel number={3} text="Pilih operator & pesan" />
          <OperatorList
            operators={operators}
            loading={loading.operators}
            creating={creating}
            onPick={handlePickOperator}
          />
        </section>
      )}
    </div>
  );
}
