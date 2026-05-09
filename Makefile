LATEXMK ?= latexmk
LATEX_FLAGS ?= -pdf -interaction=nonstopmode -halt-on-error

SOURCES := src/continuity_web_report.tex src/continuity_web_concept_brief.tex
PDFS := dist/continuity_web_report.pdf dist/continuity_web_concept_brief.pdf

.PHONY: all clean

all: $(PDFS)

dist:
	mkdir -p dist

dist/%.pdf: src/%.tex | dist
	$(LATEXMK) $(LATEX_FLAGS) -output-directory=dist $<

clean:
	$(LATEXMK) -C -output-directory=dist $(SOURCES)
