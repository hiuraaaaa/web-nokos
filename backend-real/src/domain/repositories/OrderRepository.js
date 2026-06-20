/**
 * Kontrak penyimpanan riwayat pesanan.
 * Implementasi konkretnya ada di infrastructure/persistence/JsonOrderRepository.js.
 * Bisa diganti ke SQLite/Postgres nanti tanpa ubah usecase, asal ikut kontrak ini.
 */
class OrderRepository {
  async save(_order) {
    throw new Error('OrderRepository.save belum diimplementasikan');
  }

  async update(_orderId, _partialOrder) {
    throw new Error('OrderRepository.update belum diimplementasikan');
  }

  async findById(_orderId) {
    throw new Error('OrderRepository.findById belum diimplementasikan');
  }

  async findAll() {
    throw new Error('OrderRepository.findAll belum diimplementasikan');
  }
}

module.exports = OrderRepository;
