"""
Script auxiliar para extrair texto de PDFs e gerar questões no padrão do App EAP PMMG.
Requer: pip install pypdf
"""

import sys
import json
import os

try:
    from pypdf import PdfReader
except ImportError:
    print("\n[DICA] Para ler arquivos PDF diretamente via Python, execute:")
    print("pip install pypdf\n")

def extrair_texto_pdf(caminho_pdf, max_paginas=20):
    if not os.path.exists(caminho_pdf):
        print(f"Arquivo não encontrado: {caminho_pdf}")
        return ""
    
    try:
        from pypdf import PdfReader
        reader = PdfReader(caminho_pdf)
        texto = []
        total = min(len(reader.pages), max_paginas)
        print(f"Lendo {total} páginas do arquivo {os.path.basename(caminho_pdf)}...")
        for i in range(total):
            page_text = reader.pages[i].extract_text()
            if page_text:
                texto.append(page_text)
        return "\n".join(texto)
    except Exception as e:
        print(f"Erro ao extrair PDF: {e}")
        return ""

if __name__ == "__main__":
    print("=" * 60)
    print("  EXTRATOR DE TEXTO DE PDF PARA O BANCO DO EAP PMMG")
    print("=" * 60)
    
    if len(sys.argv) > 1:
        arquivo = sys.argv[1]
        conteudo = extrair_texto_pdf(arquivo)
        if conteudo:
            saida = "texto_extraido.txt"
            with open(saida, "w", encoding="utf-8") as f:
                f.write(conteudo)
            print(f"Sucesso! Texto salvo em '{saida}'.")
            print("Agora você pode copiar trechos desse texto e usar no Google Gemini com o prompt do guia!")
    else:
        print("Uso: python gerar_questoes_pdf.py \"caminho/do/seu_arquivo.pdf\"")
        print("\nOu use o método direto via web anexando o PDF no Gemini (veja COMO_USAR_E_EXTRAIR_PDFS.md).")
