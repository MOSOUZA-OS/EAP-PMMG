# EAP PMMG - Gerador dos icones do aplicativo
# ------------------------------------------------------------------
# Identidade visual institucional da Policia Militar de Minas Gerais:
#   Preto Institucional -> campo do icone  (#373435 / PMS BLACK)
#   Caki Tiradentes    -> sigla EAP e barra inferior (#A08F63 / PMS 4515 C)
# Tipografia: Rawline Black (padrao institucional), instalada no sistema.
#
# Uso:  python gerar_icones.py
# Saida: icon-192.png e icon-512.png (PWA / Android / iOS)
# ------------------------------------------------------------------

import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# --- Cores institucionais -------------------------------------------------
PRETO_INSTITUCIONAL = (55, 52, 53)    # #373435  PMS BLACK  (tom de partida)
PRETO_ABSOLUTO = (20, 19, 20)          # #141314  K=100 (padrao para solidos)
CAKI_TIRADENTES = (160, 143, 99)       # #A08F63  PMS 4515 C

TAMANHOS = (192, 512)
SUPERAMOSTRAGEM = 4  # renderiza grande e reduz -> bordas limpas
SIGLA = "EAP"

# Rawline Black e a primeira opcao; as demais cobrem maquinas sem a Rawline.
FONTE_CANDIDATOS = (
    r"C:\Users\Pichau\AppData\Local\Microsoft\Windows\Fonts\rawline-900.ttf",
    r"C:\Windows\Fonts\rawline-900.ttf",
    r"C:\Windows\Fonts\seguibl.ttf",   # Segoe UI Black
    r"C:\Windows\Fonts\ariblk.ttf",    # Arial Black
    r"C:\Windows\Fonts\arialbd.ttf",   # Arial Bold
)


_FONTE_CACHE = {}


def caminho_fonte():
    if "caminho" not in _FONTE_CACHE:
        _FONTE_CACHE["caminho"] = next(
            (c for c in FONTE_CANDIDATOS if os.path.exists(c)), None
        )
    return _FONTE_CACHE["caminho"]


def carregar_fonte(tamanho):
    caminho = caminho_fonte()
    if not caminho:
        return ImageFont.load_default()
    return ImageFont.truetype(caminho, tamanho)


def fonte_para_largura(texto, largura_alvo):
    """Escolhe o maior corpo de fonte cuja largura do texto atinge o alvo."""
    fonte = carregar_fonte(100)
    caixa = fonte.getbbox(texto)
    largura_base = caixa[2] - caixa[0]
    if largura_base <= 0:
        return fonte

    tamanho = int(100 * largura_alvo / largura_base)
    fonte = carregar_fonte(tamanho)
    caixa = fonte.getbbox(texto)
    largura = caixa[2] - caixa[0]
    if largura == largura_alvo:
        return fonte

    # Ajuste fino proporcional (maximo de tres passadas)
    ajuste = int(tamanho * (largura_alvo / largura))
    return carregar_fonte(ajuste if ajuste != tamanho else tamanho + 1)


def interpolar(c1, c2, t):
    return tuple(round(a + (b - a) * t) for a, b in zip(c1, c2))


def gradiente_diagonal(tamanho):
    """Gradiente diagonal do Preto Institucional para o Preto Absoluto
    (gerado em baixa resolucao e ampliado, porque um degrade nao ganha
    qualidade com mais pixels)."""
    baixo = 256
    img = Image.new("RGB", (baixo, baixo))
    px = img.load()
    for y in range(baixo):
        for x in range(baixo):
            t = ((x + y) / (2.0 * (baixo - 1))) ** 0.85
            px[x, y] = interpolar(PRETO_INSTITUCIONAL, PRETO_ABSOLUTO, t)
    return img.resize((tamanho, tamanho), Image.BICUBIC)


def gerar_icone(lado):
    """Monta um icone quadrado de tamanho `lado` pixels."""
    S = lado * SUPERAMOSTRAGEM
    img = gradiente_diagonal(S).convert("RGBA")

    # Brilho radial discreto no canto superior esquerdo.
    # Contido no canto para nao lavar o campo sob a sigla.
    brilho = Image.new("L", (S, S), 0)
    bd = ImageDraw.Draw(brilho)
    raio = int(S * 0.62)
    bd.ellipse(
        [int(S * 0.10) - raio, int(S * 0.04) - raio, int(S * 0.10) + raio, int(S * 0.04) + raio],
        fill=46,
    )
    brilho = brilho.filter(ImageFilter.GaussianBlur(radius=int(S * 0.10)))
    img = Image.composite(Image.new("RGBA", (S, S), (78, 75, 78, 255)), img, brilho)

    # --- Barra institucional em Caki Tiradentes no rodape ---
    desenho = ImageDraw.Draw(img)
    altura_barra = round(S * 0.085)
    topo_barra = S - altura_barra
    desenho.rectangle([0, topo_barra, S, S], fill=CAKI_TIRADENTES + (255,))

    # Realce superior na barra, para dar profundidade
    desenho.rectangle(
        [0, topo_barra, S, topo_barra + max(1, S // 512)],
        fill=tuple(min(255, c + 34) for c in CAKI_TIRADENTES) + (255,),
    )

    # --- Sigla EAP no lugar dos tracos (Rawline Black) ---
    fonte = fonte_para_largura(SIGLA, S * 0.50)

    centro_x = S / 2.0
    centro_y = topo_barra / 2.0

    # Ajuste optico: centraliza a tinta realmente desenhada, e nao apenas
    # a caixa da fonte (que carrega espacamentos laterais desiguais).
    tinta = Image.new("L", (S, S), 0)
    ImageDraw.Draw(tinta).text((0, 0), SIGLA, font=fonte, fill=255)
    area = tinta.getbbox()
    if area is None:
        raise RuntimeError("Nao foi possivel renderizar a sigla no icone.")
    x0 = round(centro_x - (area[2] - area[0]) / 2.0) - area[0]
    y0 = round(centro_y - (area[3] - area[1]) / 2.0) - area[1]

    # Sombra suave para destacar a sigla sobre o preto
    sombra = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(sombra).text((x0, y0), SIGLA, font=fonte, fill=(0, 0, 0, 120))
    sombra = sombra.filter(ImageFilter.GaussianBlur(radius=int(S * 0.010)))
    img = Image.alpha_composite(img, sombra)

    # Sigla em Caki Tiradentes
    ImageDraw.Draw(img).text((x0, y0), SIGLA, font=fonte, fill=CAKI_TIRADENTES + (255,))

    return img.convert("RGB").resize((lado, lado), Image.LANCZOS)


def main():
    pasta = os.path.dirname(os.path.abspath(__file__))
    for lado in TAMANHOS:
        icone = gerar_icone(lado)
        destino = os.path.join(pasta, f"icon-{lado}.png")
        icone.save(destino, "PNG", optimize=True)
        print(f"[ok] {destino}  ({lado}x{lado})")


if __name__ == "__main__":
    main()
