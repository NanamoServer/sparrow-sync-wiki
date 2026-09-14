import React from 'react';
import BinaryLayout from './BinaryLayout';

const labels = {
  zh: {header: '固定头部', order: '按字节顺序读取', offset: '相对偏移', length: '长度', coverage: 'CRC 覆盖', total: '总字节数', hint: '点击字段查看编码说明', scale: '示意宽度不代表字节比例'},
  en: {header: 'fixed header', order: 'Byte order on disk', offset: 'Offset', length: 'Length', coverage: 'CRC covers', total: 'Total bytes', hint: 'Select a field to inspect its encoding', scale: 'Field widths are schematic'},
};

const formats = {
  snapshot: {
    title: ['完整二进制快照', 'Full binary snapshot'], caption: '01 / BINARY SNAPSHOT', headerBytes: 7, total: '7 + M + dataFrame.length',
    fields: [
      ['format', '0', '1 B', 'u8', 'blue', ['格式标记，当前写入 1。', 'Format marker, currently written as 1.']],
      ['metaLength', '1', '2 B', 'u16', 'blue', ['Meta NBT 的字节数，记为 M。', 'Byte length of the Meta NBT, denoted by M.']],
      ['metaCrc', '3', '4 B', 'CRC32', 'amber', ['仅计算后续 M 字节 Meta NBT 的 CRC32。', 'CRC32 of the following M bytes of Meta NBT only.'], '[7, 7 + M)'],
      ['Meta', '7', 'M B', 'CompoundTag', 'violet', ['未压缩的元数据 NBT，保存快照身份、玩家身份、保存时刻等信息。', 'Uncompressed metadata NBT containing the snapshot ID, player ID, save timestamp, and related fields.']],
      ['dataFrame', '7 + M', 'F B', 'SnapshotData', 'teal', ['一个完整的独立数据帧，从它自己的 format 字节开始，一直延伸到快照末尾。F 表示该帧的字节数。', 'A complete standalone data frame, starting with its own format byte and extending to the end of the snapshot. F is its byte length.']],
    ],
  },
  frame: {
    title: ['独立数据帧', 'Standalone data frame'], caption: '02 / DATA FRAME', headerBytes: 9, total: '9 + I + Σ(13 + P)',
    fields: [
      ['format', '0', '1 B', 'u8', 'blue', ['数据帧的格式标记，当前写入 1。数据库 data 字段从这个字节开始。', 'The data frame format marker, currently written as 1. The database data field starts at this byte.']],
      ['indexLength', '1', '4 B', 'u32', 'blue', ['索引 NBT 的字节数，记为 I。', 'Byte length of the index NBT, denoted by I.']],
      ['indexCrc', '5', '4 B', 'CRC32', 'amber', ['仅计算后续 I 字节索引 NBT 的 CRC32。', 'CRC32 of the following I bytes of index NBT only.'], '[9, 9 + I)'],
      ['index', '9', 'I B', 'CompoundTag', 'violet', ['未压缩的索引 NBT。每个完整 DataKey 对应一个 IntTag，值为该块相对块区起点的偏移。', 'Uncompressed index NBT. Each full DataKey maps to an IntTag offset measured from the start of the block area.']],
      ['blocks', '9 + I', 'Σ(13 + P) B', 'DataBlock[]', 'teal', ['各类型的数据块连续排列。每块包含 13 字节头部和 P 字节 payload，P 随块而变。', 'Contiguous data blocks, one per data type. Each has a 13-byte header and a P-byte payload; P varies by block.']],
    ],
  },
  block: {
    title: ['单个类型的数据块', 'One data type per block'], caption: '03 / DATA BLOCK', headerBytes: 13, total: '13 + P',
    fields: [
      ['compressorId', '0', '1 B', 'u8', 'blue', ['当前块的压缩算法编号。内置 0 = NONE、1 = DEFLATE、2 = ZSTD。', 'Compression algorithm for this block. Built-in IDs are 0 = NONE, 1 = DEFLATE, and 2 = ZSTD.']],
      ['payloadLength', '1', '4 B', 'i32', 'blue', ['实际保存的 payload 字节数，记为 P，不包含 13 字节块头。', 'Stored payload length P, excluding the 13-byte block header.']],
      ['rawLength', '5', '4 B', 'i32', 'violet', ['解压后的完整单键 compound 的 NBT 字节数，包含外层 DataKey。未压缩时等于 payloadLength。', 'NBT byte length of the full single-entry compound after decompression, including the outer DataKey. Equals payloadLength when uncompressed.']],
      ['checksum', '9', '4 B', 'CRC32', 'amber', ['计算实际保存的 P 字节 payload 的 CRC32。使用压缩时，计算的是压缩后的字节。', 'CRC32 of the P stored payload bytes. For compressed blocks, this covers the compressed bytes.'], '[13, 13 + P)'],
      ['payload', '13', 'P B', 'byte[]', 'teal', ['原始 NBT 或压缩后的 NBT 字节。还原后的根节点是只含当前完整 DataKey 的 compound。', 'Raw or compressed NBT bytes. The decoded root is a compound containing exactly the full DataKey of this type.']],
    ],
  },
};

export default function SnapshotFormat({kind, lang = 'en'}) {
  const format = formats[kind];
  const language = lang === 'zh' ? 0 : 1;
  const fields = format.fields.map(([name, offset, size, type, tone, description, coverage]) => ({name, offset, size, type, tone, description: description[language], coverage}));

  return <BinaryLayout title={format.title[language]} caption={format.caption} headerBytes={format.headerBytes} total={format.total} fields={fields} labels={labels[lang]} />;
}
