import { parse } from 'date-fns';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Member } from './member.entity';

export type RawMember = {
  'Marca temporal': string;
  'Nombre:': string;
  'Primer Apellido': string;
  'Segundo Apellido': string;
  'Correo Electrónico:': string;
  'Número de teléfono Celular: (para ingresar al chat de whatsapp)': string;
  'Provincia:': string;
  'Modelo de CB500:': string;
  'Número de Placa de la Moto (Para casos de emergencia)': string;
  'Número de teléfono de algún familiar o conocido para contactar en casos de emergencia': string;
  'He leído las reglas del CLUB OFICIAL CB500, estoy de acuerdo en cumplirlas.': string;
  'Normalmente a los nuevos se les agrega al chat todos los lunes.': string;
  'Número de Cédula:': string;
  'Asegúrate de que su Whatsapp permita agregar a grupos': string;
};

export const mapToMember = (row: GoogleSpreadsheetRow<RawMember>): Member => ({
  requestedDate: parse(
    row.get('Marca temporal'),
    'dd/MM/yyyy HH:mm:ss',
    new Date()
  ),
  addedDate: new Date(),
  email: row.get('Correo Electrónico:'),
  familyPhone: row.get(
    'Número de teléfono de algún familiar o conocido para contactar en casos de emergencia'
  ),
  name: `${row.get('Nombre:')} ${row.get('Primer Apellido')} ${row.get(
    'Segundo Apellido'
  )}`,
  phone: row.get(
    'Número de teléfono Celular: (para ingresar al chat de whatsapp)'
  ),
  plate: row.get('Número de Placa de la Moto (Para casos de emergencia)'),
  province: row.get('Provincia:'),
  nationalId: row.get('Número de Cédula:'),
});
