import { create } from 'xmlbuilder2';

interface NfseData {
    prestador: {
        cnpj: string;
        inscricaoMunicipal: string;
    };
    rps: {
        numero: string;
        serie: string;
        tipo: string;
        dataEmissao: string;
        naturezaOperacao: string;
        regimeTributacao: string;
        simplesNacional: string;
        incentivador: string;
    };
    servico: {
        valor: string;
        issRetido: string;
        valorIss: string;
        itemListaServico: string;
        discriminacao: string;
        codigoMunicipio: string;
    };
    tomador: {
        cnpj?: string;
        cpf?: string;
        razaoSocial: string;
        endereco: string;
        numero: string;
        bairro: string;
        codigoMunicipio: string;
        uf: string;
        cep: string;
    };
};

class GenerateXML {

    async generateNFeXML(invoiceData: any) {
        const nfeJson = {
            nfeProc: {
                '@xmlns': 'http://www.portalfiscal.inf.br/nfe',
                '@versao': '4.00',
                NFe: {
                    infNFe: {
                        '@Id': invoiceData.Id,
                        '@versao': '4.00',

                        // Identificação da NF-e
                        ide: {
                            cUF: invoiceData.cUF,
                            natOp: invoiceData.natOp,
                            mod: invoiceData.mod,
                            serie: invoiceData.serie,
                            nNF: invoiceData.nNF,
                            dhEmi: invoiceData.dhEmi,
                            tpNF: invoiceData.tpNF,
                            idDest: invoiceData.idDest,
                            cMunFG: invoiceData.cMunFG,
                            tpImp: invoiceData.tpImp,
                            tpEmis: invoiceData.tpEmis,
                            cDV: invoiceData.cDV,
                            tpAmb: invoiceData.tpAmb,
                            finNFe: invoiceData.finNFe,
                            indFinal: invoiceData.indFinal,
                            indPres: invoiceData.indPres,
                            procEmi: invoiceData.procEmi,
                            verProc: invoiceData.verProc
                        },

                        // Emitente
                        emit: {
                            CNPJ: invoiceData.CNPJ,
                            xNome: invoiceData.name,
                            enderEmit: {
                                xLgr: invoiceData.address,
                                nro: invoiceData.nro,
                                xBairro: invoiceData.neighborhood,
                                cMun: invoiceData.municipalCode,
                                xMun: invoiceData.xMun,
                                UF: invoiceData.state,
                                CEP: invoiceData.cep,
                                cPais: invoiceData.cPais,
                                xPais: invoiceData.xPais,
                                fone: invoiceData.phone
                            },
                            IE: invoiceData.ie,
                            CRT: invoiceData.CRT
                        },

                        // Destinatário
                        dest: {
                            CNPJ: invoiceData.CNPJDest,
                            xNome: invoiceData.xNomeDest,
                            enderDest: {
                                xLgr: invoiceData.xLgrDest,
                                nro: invoiceData.nroDest,
                                xBairro: invoiceData.xBairroDest,
                                cMun: invoiceData.cMunDest,
                                xMun: invoiceData.xMunDest,
                                UF: invoiceData.UFDest,
                                CEP: invoiceData.CEPDest,
                                cPais: invoiceData.cPaisDest,
                                xPais: invoiceData.xPaisDest,
                                fone: invoiceData.foneDest
                            },
                            indIEDest: invoiceData.indIEDest,
                            IE: invoiceData.IEDest,
                            email: invoiceData.emailDest
                        },

                        // Produtos (detalhes)
                        det: {
                            '@nItem': invoiceData.nItem,
                            prod: {
                                cProd: invoiceData.items.cProd,
                                cEAN: invoiceData.items.cEAN,
                                xProd: invoiceData.items.xProd,
                                NCM: invoiceData.items.NCM,
                                CFOP: invoiceData.items.CFOP,
                                uCom: invoiceData.items.uCom,
                                qCom: invoiceData.items.qCom,
                                vUnCom: invoiceData.items.vUnCom,
                                vProd: invoiceData.items.vProd,
                                cEANTrib: invoiceData.items.cEANTrib,
                                uTrib: invoiceData.items.uTrib,
                                qTrib: invoiceData.items.qTrib,
                                vUnTrib: invoiceData.items.vUnTrib,
                                indTot: invoiceData.items.indTot
                            },
                            imposto: {
                                ICMS: {
                                    ICMS00: {
                                        orig: invoiceData.orig,
                                        CST: invoiceData.CST,
                                        modBC: invoiceData.modBC,
                                        vBC: invoiceData.vBC,
                                        pICMS: invoiceData.pICMS,
                                        vICMS: invoiceData.vICMS
                                    }
                                }
                            }
                        },

                        // Totais
                        total: {
                            ICMSTot: {
                                vBC: invoiceData.vBC,
                                vICMS: invoiceData.vICMS,
                                vICMSDeson: invoiceData.vICMSDeson,
                                vFCP: invoiceData.vFCP,
                                vBCST: invoiceData.vBCST,
                                vST: invoiceData.vST,
                                vProd: invoiceData.vProd,
                                vFrete: invoiceData.vFrete,
                                vSeg: invoiceData.vSeg,
                                vDesc: invoiceData.vDesc,
                                vII: invoiceData.vII,
                                vIPI: invoiceData.vIPI,
                                vPIS: invoiceData.vPIS,
                                vCOFINS: invoiceData.vCOFINS,
                                vOutro: invoiceData.vOutro,
                                vNF: invoiceData.vNF
                            }
                        },

                        // Transporte
                        transp: {
                            modFrete: invoiceData.modFrete,
                        },

                        // Pagamento
                        pag: {
                            detPag: {
                                indPag: invoiceData.indPag,
                                tPag: invoiceData.tPag,
                                vPag: invoiceData.vPag,
                            }
                        }
                    }
                }
            }
        };

        const xml = create(nfeJson).end({ prettyPrint: true });
        console.log(xml);
    };

    async generateNfseXML(data: NfseData): Promise<string> {
        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('EnviarLoteRpsEnvio', { xmlns: 'http://www.abrasf.org.br/nfse.xsd' })
            .ele('LoteRps', { Id: 'lote1', versao: '2.04' })
                .ele('NumeroLote').txt('1').up()
                .ele('Cnpj').txt(data.prestador.cnpj).up()
                .ele('InscricaoMunicipal').txt(data.prestador.inscricaoMunicipal).up()
                .ele('QuantidadeRps').txt('1').up()
                .ele('ListaRps')
                .ele('Rps')
                    .ele('InfRps', { Id: `rps${data.rps.numero}` })
                    .ele('IdentificacaoRps')
                        .ele('Numero').txt(data.rps.numero).up()
                        .ele('Serie').txt(data.rps.serie).up()
                        .ele('Tipo').txt(data.rps.tipo).up()
                    .up()
                    .ele('DataEmissao').txt(data.rps.dataEmissao).up()
                    .ele('NaturezaOperacao').txt(data.rps.naturezaOperacao).up()
                    .ele('RegimeEspecialTributacao').txt(data.rps.regimeTributacao).up()
                    .ele('OptanteSimplesNacional').txt(data.rps.simplesNacional).up()
                    .ele('IncentivadorCultural').txt(data.rps.incentivador).up()
                    .ele('Status').txt('1').up()
                    .ele('Servico')
                        .ele('Valores')
                        .ele('ValorServicos').txt(data.servico.valor).up()
                        .ele('IssRetido').txt(data.servico.issRetido).up()
                        .ele('ValorIss').txt(data.servico.valorIss).up()
                        .up()
                        .ele('ItemListaServico').txt(data.servico.itemListaServico).up()
                        .ele('Discriminacao').txt(data.servico.discriminacao).up()
                        .ele('CodigoMunicipio').txt(data.servico.codigoMunicipio).up()
                    .up()
                    .ele('Prestador')
                        .ele('Cnpj').txt(data.prestador.cnpj).up()
                        .ele('InscricaoMunicipal').txt(data.prestador.inscricaoMunicipal).up()
                    .up()
                    .ele('TomadorServico')
                        .ele('IdentificacaoTomador')
                        .ele('CpfCnpj')
                            .ele(data.tomador.cnpj ? 'Cnpj' : 'Cpf')
                            .txt(data.tomador.cnpj || data.tomador.cpf!)
                            .up()
                        .up()
                        .up()
                        .ele('RazaoSocial').txt(data.tomador.razaoSocial).up()
                        .ele('Endereco')
                        .ele('Endereco').txt(data.tomador.endereco).up()
                        .ele('Numero').txt(data.tomador.numero).up()
                        .ele('Bairro').txt(data.tomador.bairro).up()
                        .ele('CodigoMunicipio').txt(data.tomador.codigoMunicipio).up()
                        .ele('Uf').txt(data.tomador.uf).up()
                        .ele('Cep').txt(data.tomador.cep).up()
                        .up()
                    .up()
                    .up()
                .up()
                .up()
            .up()
            .end({ prettyPrint: true });

        return xml;
    };
    
};

export default new GenerateXML();