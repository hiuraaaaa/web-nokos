import { useCallback, useEffect, useState } from 'react';
import { nokosRepository } from '../infrastructure/http/nokosRepository';

export function useCatalog() {
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState({ services: true, countries: false, operators: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    nokosRepository
      .getServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading((l) => ({ ...l, services: false })));
  }, []);

  const loadCountries = useCallback(async (serviceId) => {
    setLoading((l) => ({ ...l, countries: true }));
    setCountries([]);
    setOperators([]);
    setError(null);
    try {
      const data = await nokosRepository.getCountries(serviceId);
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((l) => ({ ...l, countries: false }));
    }
  }, []);

  const loadOperators = useCallback(async (country, providerId) => {
    setLoading((l) => ({ ...l, operators: true }));
    setOperators([]);
    setError(null);
    try {
      const data = await nokosRepository.getOperators(country, providerId);
      setOperators(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((l) => ({ ...l, operators: false }));
    }
  }, []);

  return { services, countries, operators, loading, error, loadCountries, loadOperators };
}
