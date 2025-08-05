import { create } from 'xmlbuilder2';

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


    async generateNFSeXML(invoiceData: any) {
        
    };
};

export default new GenerateXML();